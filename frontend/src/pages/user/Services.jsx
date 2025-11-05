import { Sparkles, TrendingUp, Shield, Zap, Target, Users } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Sparkles,
      title: 'AI-Powered Recommendations',
      description: 'Our advanced AI algorithms analyze your preferences and browsing behavior to suggest products that perfectly match your needs and interests.',
      features: [
        'Personalized product suggestions',
        'Smart filtering and categorization',
        'Behavior-based recommendations',
        'Continuous learning from your feedback'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Best Deals & Offers',
      description: 'We constantly monitor and update our platform with the latest deals, discounts, and exclusive offers from top affiliate partners.',
      features: [
        'Real-time price tracking',
        'Exclusive discount codes',
        'Limited-time offers',
        'Price drop alerts'
      ]
    },
    {
      icon: Shield,
      title: 'Trusted Affiliate Partners',
      description: 'We only work with verified and reputable affiliate partners to ensure you get quality products and secure transactions.',
      features: [
        'Verified seller programs',
        'Quality assurance checks',
        'Secure payment processing',
        'Buyer protection policies'
      ]
    },
    {
      icon: Zap,
      title: 'Lightning-Fast Search',
      description: 'Find exactly what you\'re looking for with our powerful search engine and advanced filtering options.',
      features: [
        'Instant search results',
        'Multi-criteria filtering',
        'Category-based browsing',
        'Sort by price, rating, or popularity'
      ]
    },
    {
      icon: Target,
      title: 'Curated Collections',
      description: 'Browse through hand-picked collections of products organized by themes, occasions, and trends.',
      features: [
        'Expert-curated selections',
        'Seasonal collections',
        'Trending product highlights',
        'Gift guides and recommendations'
      ]
    },
    {
      icon: Users,
      title: 'Community Reviews',
      description: 'Make informed decisions with authentic reviews and ratings from our community of shoppers.',
      features: [
        'Verified purchase reviews',
        'Detailed product ratings',
        'User photos and videos',
        'Q&A with other buyers'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-darker">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 via-darker to-darker border-b border-gray-800">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-400">
              Discover how AffiliateSphere helps you find the best products with cutting-edge technology
              and exceptional service
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="card hover:border-primary/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{service.title}</h3>
                </div>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1">✓</span>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">AffiliateSphere</span>
            </h2>
            <p className="text-gray-400 text-lg">
              We're committed to providing the best shopping experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <h3 className="text-xl font-bold mb-3">Free to Use</h3>
              <p className="text-gray-300">
                Access all our features and services completely free. No hidden charges, no subscription fees.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <h3 className="text-xl font-bold mb-3">Always Updated</h3>
              <p className="text-gray-300">
                Our catalog is constantly updated with the latest products and deals from thousands of partners.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <h3 className="text-xl font-bold mb-3">User-Centric Design</h3>
              <p className="text-gray-300">
                Intuitive interface designed for easy navigation and seamless shopping experience.
              </p>
            </div>
            <div className="card bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-300">
                Our support team is always ready to help you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center card bg-gradient-to-br from-primary/20 to-transparent border-primary/30">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-gray-400 mb-6">
            Join thousands of satisfied users who trust AffiliateSphere for their shopping needs
          </p>
          <a href="/" className="btn-primary inline-block">
            Explore Products Now
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
