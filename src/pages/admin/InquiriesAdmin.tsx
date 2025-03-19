
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Trash2, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for inquiries
const mockInquiries = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    message: 'I am interested in the property at 123 Main St.',
    property: 'Luxury Villa in Beverly Hills',
    status: 'new',
    date: '2023-06-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1987654321',
    message: 'Is the downtown apartment still available?',
    property: 'Modern Apartment in Downtown',
    status: 'read',
    date: '2023-06-14T14:45:00Z'
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael@example.com',
    phone: '+1122334455',
    message: 'I would like to schedule a viewing for the beachfront property.',
    property: 'Beachfront House in Malibu',
    status: 'replied',
    date: '2023-06-13T09:15:00Z'
  }
];

const InquiriesAdmin = () => {
  const [inquiries, setInquiries] = useState(mockInquiries);
  const { toast } = useToast();
  
  const handleDelete = (id: string) => {
    setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
    toast({
      title: "Inquiry deleted",
      description: "The inquiry has been successfully deleted.",
    });
  };
  
  const handleMarkAsRead = (id: string) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? {...inquiry, status: 'read'} : inquiry
    ));
    toast({
      title: "Marked as read",
      description: "The inquiry has been marked as read.",
    });
  };
  
  const handleReply = (id: string) => {
    // In a real application, this would open a reply form or email client
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? {...inquiry, status: 'replied'} : inquiry
    ));
    toast({
      title: "Reply sent",
      description: "Your reply has been sent successfully.",
    });
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'read':
        return <Badge variant="outline">Read</Badge>;
      case 'replied':
        return <Badge className="bg-green-500">Replied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customer Inquiries</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Inquiry Management</CardTitle>
          <CardDescription>
            View and manage customer inquiries about your properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <MessageSquare className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="font-medium text-lg">No inquiries yet</h3>
              <p className="text-muted-foreground mt-1">
                When customers send inquiries, they will appear here.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell className="font-medium">{formatDate(inquiry.date)}</TableCell>
                    <TableCell>{inquiry.name}</TableCell>
                    <TableCell>{inquiry.email}</TableCell>
                    <TableCell>{inquiry.property}</TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {inquiry.status === 'new' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleMarkAsRead(inquiry.id)}
                            title="Mark as read"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleReply(inquiry.id)}
                          title="Reply"
                        >
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDelete(inquiry.id)}
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InquiriesAdmin;
