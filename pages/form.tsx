import { usePortfolioStore } from '../store/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';

interface FormData {
  category: string;
  name: string;
  level: number;
}

const categories = [
  "Programming Languages",
  "Frontend Frameworks & Libraries",
  "Backend Technologies",
  "Blockchain Development",
  "AI & Machine Learning",
  "DevOps & Tools"
];

const FormPage = () => {
  const [formData, setFormData] = useState<FormData>({
    category: categories[0],
    name: '',
    level: 80
  });
  const addSkill = usePortfolioStore((state) => state.addSkill);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSkill(formData.category, { name: formData.name, level: formData.level });
    setFormData({ category: categories[0], name: '', level: 80 });
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'level' ? Number(value) : value
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-text dark:text-text-dark text-center">Add Skill</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-text dark:text-text-dark mb-2">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark text-text dark:text-text-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text dark:text-text-dark mb-2">
              Skill Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark text-text dark:text-text-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div>
            <label htmlFor="level" className="block text-sm font-medium text-text dark:text-text-dark mb-2">
              Proficiency Level (0-100)
            </label>
            <input
              id="level"
              type="number"
              min="0"
              max="100"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark text-text dark:text-text-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <Button type="submit" className="w-full btn-primary">
            Add Skill
          </Button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default FormPage;