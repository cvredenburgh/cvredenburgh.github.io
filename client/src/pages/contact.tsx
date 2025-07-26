import { useState } from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Contact information - you can edit these with your actual info
  const contactInfo = {
    email: "cvredenburgh@gmail.com",
    linkedin: {
      url: "https://www.linkedin.com/in/chrisvredenburgh/",
      username: "chrisvredenburgh",
    },
    twitter: {
      url: "https://twitter.com/c_vredenburgh",
      username: "@c_vredenburgh",
    },
    instagram: {
      url: "https://instagram.com/chrisvredenburgh",
      username: "@chrisvredenburgh",
    },
    github: {
      url: "https://github.com/cvredenburgh",
      username: "cvredenburgh",
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name.trim()) {
      alert("Please enter your name.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!formData.message.trim()) {
      alert("Please enter a message.");
      return;
    }

    try {
      // Send email via dedicated API server
      const response = await fetch('https://contact-api.chrisvred.repl.co/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Contact Form Message',
          message: formData.message,
        }),
      });

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for your message. I'll get back to you soon!",
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Sorry, there was an error sending your message. Please try again or contact me directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      <section className="mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Links & Contact
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
          Feel free to reach out to me through any of the linked channels! I'm always happy to connect with new people and discuss shared interests.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Connect With Me
          </h2>

          <div className="space-y-4">
            <a
              href={contactInfo.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-600 rounded-full">
                <FaLinkedinIn className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  LinkedIn
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  linkedin.com/in/{contactInfo.linkedin.username}
                </p>
              </div>
            </a>

            <a
              href={contactInfo.twitter.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-400 rounded-full">
                <FaTwitter className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Twitter/X
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {contactInfo.twitter.username}
                </p>
              </div>
            </a>

            <a
              href={contactInfo.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-900 rounded-full">
                <FaGithub className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  GitHub
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  github.com/{contactInfo.github.username}
                </p>
              </div>
            </a>

            <a
              href={contactInfo.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition"
            >
              <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <FaInstagram className="text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Instagram
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {contactInfo.instagram.username}
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Send me a note
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subject
              </Label>
              <Input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <div>
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
