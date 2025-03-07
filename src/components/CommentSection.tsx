
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
}

interface CommentSectionProps {
  postId: string;
}

const CommentSection = ({ postId }: CommentSectionProps) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
      content: 'This was such an informative article! I never realized how elliptical planetary orbits actually are.',
      date: '3 days ago',
      likes: 12,
    },
    {
      id: '2',
      author: {
        name: 'Samantha Lee',
        avatar: 'https://i.pravatar.cc/150?img=5',
      },
      content: 'I tried the interactive visualization with my daughter and she loved it. Great educational tool!',
      date: '5 days ago',
      likes: 8,
    },
  ]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) {
      return;
    }
    
    // In a real app, this would be sent to an API
    const comment: Comment = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=8',
      },
      content: newComment,
      date: 'Just now',
      likes: 0,
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    
    toast({
      title: 'Comment posted',
      description: 'Your comment has been added successfully.',
    });
  };

  const handleLike = (id: string) => {
    setComments(
      comments.map(comment =>
        comment.id === id
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  return (
    <section className="py-10">
      <h3 className="text-2xl font-heading mb-6">Discussion</h3>
      
      <form onSubmit={handleSubmitComment} className="mb-10">
        <div className="flex space-x-4">
          <Avatar className="w-10 h-10 border border-white/10">
            <img src="https://i.pravatar.cc/150?img=8" alt="Your avatar" />
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="bg-muted/20 border border-white/10 resize-none mb-3 focus:ring-1 focus:ring-primary"
              rows={3}
            />
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={!newComment.trim()}
              >
                Post comment
              </Button>
            </div>
          </div>
        </div>
      </form>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-4 glass-card p-4 rounded-lg">
            <Avatar className="w-10 h-10 border border-white/10">
              <img src={comment.author.avatar} alt={comment.author.name} />
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">{comment.author.name}</h4>
                  <p className="text-xs text-muted-foreground">{comment.date}</p>
                </div>
              </div>
              <p className="mt-2 text-sm">{comment.content}</p>
              <div className="mt-3 flex items-center space-x-4">
                <button
                  className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => handleLike(comment.id)}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 mr-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                </button>
                <button className="flex items-center text-xs text-muted-foreground hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Reply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommentSection;
