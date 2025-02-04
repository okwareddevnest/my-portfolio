#!/bin/bash

# Colors and symbols for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'
CHECK="✓"
CROSS="✗"
ARROW="→"

# Function to show spinner while waiting
spinner() {
    local pid=$1
    local delay=0.1
    local spinstr='|/-\'
    while [ "$(ps a | awk '{print $1}' | grep $pid)" ]; do
        local temp=${spinstr#?}
        printf " [%c]  " "$spinstr"
        local spinstr=$temp${spinstr%"$temp"}
        sleep $delay
        printf "\b\b\b\b\b\b"
    done
    printf "    \b\b\b\b"
}

# Function to create a new blog post
create_blog_post() {
    local url=$1
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    local id=$(uuidgen)
    
    # Determine platform
    if [[ $url == *"linkedin.com"* ]]; then
        platform="linkedin"
        tags='["LinkedIn", "Professional", "Tech"]'
    elif [[ $url == *"x.com"* ]] || [[ $url == *"twitter.com"* ]]; then
        platform="twitter"
        tags='["X", "Tech", "Development"]'
    else
        echo -e "${RED}${CROSS} Error: Invalid URL. Please provide a LinkedIn or X (Twitter) URL.${NC}"
        exit 1
    fi

    # Create blog post JSON
    local post=$(cat <<EOF
{
  id: "$id",
  title: "New Post from $platform",
  content: "View the full post on $platform",
  publishedAt: "$timestamp",
  author: {
    name: "Dedan Okware",
    image: "/profile.png",
    role: "Software Engineer"
  },
  tags: $tags,
  readTime: "1 min read",
  source: {
    type: "$platform",
    url: "$url"
  }
}
EOF
)

    # Update blogs data file
    local data_file="data/blogs.ts"
    
    # Create the file if it doesn't exist
    if [ ! -f "$data_file" ]; then
        cat > "$data_file" <<EOF
import { Blog } from '../store/store';

export const blogs: Blog[] = [];

export const addBlog = (blog: Blog) => {
  blogs.unshift(blog);
};
EOF
    fi

    # Add new blog post to the array
    sed -i "/export const blogs: Blog\[\] = \[/a \ \ $post," "$data_file"
}

# Main script
echo -e "\n${BLUE}🌟 Blog Post Automation${NC}\n"

# Get URL from user
read -p "$(echo -e "${BLUE}${ARROW} Enter your LinkedIn or X post URL:${NC} ")" url

if [ -z "$url" ]; then
    echo -e "${RED}${CROSS} Error: No URL provided${NC}"
    exit 1
fi

# Confirm with user
echo -e "\n${BLUE}Post Details:${NC}"
echo -e "URL: $url"
if [[ $url == *"linkedin.com"* ]]; then
    echo -e "Platform: LinkedIn"
else
    echo -e "Platform: X (Twitter)"
fi

read -p "$(echo -e "\n${BLUE}${ARROW} Would you like to proceed? (y/n):${NC} ")" confirm
if [[ $confirm != "y" ]]; then
    echo -e "\n${RED}${CROSS} Operation cancelled by user${NC}"
    exit 0
fi

echo -e "\n${BLUE}${ARROW} Creating blog post...${NC}"
create_blog_post "$url" &
spinner $!
echo -e "${GREEN}${CHECK} Blog post created${NC}"

echo -e "\n${BLUE}${ARROW} Committing changes...${NC}"
git add data/blogs.ts
git commit -m "Add new blog post" &> /dev/null
spinner $!
echo -e "${GREEN}${CHECK} Changes committed${NC}"

echo -e "\n${BLUE}${ARROW} Pushing to GitHub...${NC}"
git push origin main &> /dev/null &
spinner $!
echo -e "${GREEN}${CHECK} Changes pushed${NC}"

echo -e "\n${BLUE}${ARROW} Deploying to Vercel...${NC}"
vercel --prod &> /dev/null &
spinner $!
echo -e "${GREEN}${CHECK} Deployed successfully${NC}"

echo -e "\n${GREEN}🎉 Success! Your post has been added to your portfolio.${NC}"
echo -e "${BLUE}🔗 View it at: https://my-portfolio-crypt.vercel.app/blogs${NC}\n" 