import { usePortfolioStore } from '../store/store';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import { AnimatedBackground } from '../components/AnimatedBackground';

interface FormData {
  name: string;
  description: string;
}

const FormPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: ''
  });
  const addSkill = usePortfolioStore((state) => state.addSkill);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addSkill(formData);
    setFormData({ name: '', description: '' });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-text dark:text-text-dark text-center">Add Skill</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text dark:text-text-dark mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark text-text dark:text-text-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text dark:text-text-dark mb-2">
              Description
            </label>
            <input
              id="description"
              type="text"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-md border border-border dark:border-border-dark bg-card dark:bg-card-dark text-text dark:text-text-dark px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
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