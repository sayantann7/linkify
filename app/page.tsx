"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Leaf, TreePine } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
  const [links, setLinks] = useState<{ url: string; platform: string }[]>([]);
  const [newLink, setNewLink] = useState({ url: '', platform: '' });
  const [username, setUsername] = useState('');
  const router = useRouter();

  const addLink = () => {
    if (newLink.url && newLink.platform) {
      setLinks([...links, newLink]);
      setNewLink({ url: '', platform: '' });
    }
  };

  const createLinkTree = async () => {
    if (username && links.length > 0) {
      await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, links }),
      });
      router.push(`/${username}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 dark:from-green-900 dark:to-green-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-2">
            <TreePine className="h-12 w-12 text-green-600 dark:text-green-400" />
            <h1 className="text-4xl font-bold text-green-800 dark:text-green-200">Linkify</h1>
          </div>
          <p className="text-center text-gray-600 dark:text-gray-300 max-w-md">
            Create your own link tree in seconds. Share all your important links through a single beautiful page.
          </p>
          <div className="w-full max-w-md space-y-4 bg-white dark:bg-green-950 p-6 rounded-lg shadow-xl">
            <div className="space-y-4">
              <Input
                placeholder="Enter platform (e.g., Instagram, Twitter)"
                value={newLink.platform}
                onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
                className="border-green-200 focus:border-green-500"
              />
              <Input
                placeholder="Enter URL"
                value={newLink.url}
                onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                className="border-green-200 focus:border-green-500"
              />
              <Button onClick={addLink} className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Leaf className="mr-2 h-4 w-4" />
                Add Link
              </Button>
            </div>
            {links.length > 0 && (
              <div className="mt-4 space-y-2">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">Your Links:</h3>
                {links.map((link, index) => (
                  <div key={index} className="flex items-center justify-between bg-green-50 dark:bg-green-900 p-2 rounded">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{link.platform}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLinks(links.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
            <div className="pt-4 border-t border-green-100 dark:border-green-800">
              <Input
                placeholder="Choose your unique username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                className="border-green-200 focus:border-green-500"
              />
              <Button onClick={createLinkTree} disabled={!username || links.length === 0} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                Create My Linkify Page
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}