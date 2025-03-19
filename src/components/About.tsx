
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image side */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-elevation-3">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt="Modern Commercial Building"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 lg:-bottom-10 lg:-left-10 rounded-2xl bg-real-50 p-6 shadow-elevation-1 max-w-xs">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-4xl font-bold text-real-700">12+</div>
                <div className="text-base font-medium">Years of Excellence</div>
              </div>
              <div className="h-1 w-1/3 bg-real-400 mb-4 rounded-full"></div>
              <p className="body-sm text-muted-foreground">
                Delivering exceptional real estate investment services since 2011.
              </p>
            </div>
          </div>
          
          {/* Content side */}
          <div className="space-y-6">
            <div className="animate-fade-up">
              <span className="tag bg-real-100 text-real-700 mb-4">About OOL Properties</span>
              <h2 className="heading-lg mb-6">Your Trusted Partner for Real Estate Investment</h2>
              <p className="body-lg text-muted-foreground mb-8">
                OOL Properties specializes in identifying high-value investment opportunities and providing comprehensive real estate solutions to our clients. With a team of experienced professionals, we deliver personalized service focused on maximizing returns.
              </p>
            </div>
            
            <div className="space-y-4 animate-fade-up stagger-delay-1">
              {keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="text-real-500 mt-1 shrink-0" size={20} />
                  <p className="body-md">{point}</p>
                </div>
              ))}
            </div>
            
            <div className="pt-6 animate-fade-up stagger-delay-2">
              <Button>Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const keyPoints = [
  "Expert team with decades of combined real estate experience",
  "Comprehensive due diligence on all investment opportunities",
  "Personalized investment strategies tailored to your goals",
  "End-to-end property management and advisory services",
  "Strong track record of delivering exceptional returns"
];

export default About;
