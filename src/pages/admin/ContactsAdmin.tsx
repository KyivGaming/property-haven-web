
import React, { useEffect, useState } from 'react';
import { supabase, Tables } from '@/integrations/supabase/client';
import { ContactFormData } from '@/types/contact';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { Loader2 } from 'lucide-react';

const ContactsAdmin = () => {
  const [contacts, setContacts] = useState<ContactFormData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data, error } = await supabase
          .from('contacts')
          .select('*')
          .order('created_at', { ascending: false }) as { data: Tables['contacts']['Row'][] | null, error: any };
          
        if (error) throw error;
        
        // Transform the data to match the ContactFormData type
        if (data) {
          const formattedContacts: ContactFormData[] = data.map(contact => ({
            id: contact.id,
            name: contact.name,
            email: contact.email,
            phone: contact.phone || '',
            message: contact.message,
            createdAt: contact.created_at
          }));
          
          setContacts(formattedContacts);
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Contact Inquiries</h1>
      <p className="text-muted-foreground">View and manage inquiries from potential clients.</p>
      
      {contacts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">No contact inquiries yet.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {contacts.map((contact) => (
            <Card key={contact.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{contact.name}</CardTitle>
                    <CardDescription>
                      {contact.email} • {contact.phone || 'No phone provided'}
                    </CardDescription>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {contact.createdAt && formatDistanceToNow(new Date(contact.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{contact.message}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactsAdmin;
