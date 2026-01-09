'use client';

const AboutView: React.FC = () => {

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#06336e] text-white py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-white/90 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800" 
                  alt="Our Story" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#f68712] rounded-2xl -z-10"></div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Mission & Vision
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#06336e] to-[#084a9c] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Mission
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt:
              </p>

              <ul className="space-y-4">
                {[
                  'Deliver exceptional quality and innovative solutions',
                  'Build long-lasting relationships with our clients',
                  'Foster a culture of continuous learning and growth',
                  'Maintain the highest standards of integrity',
                  'Contribute positively to our community'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-[#06336e] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#f68712] transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#f68712] to-[#ff9a3c] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Our Vision
                  </h3>
                </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-6">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore:
              </p>

              <ul className="space-y-4">
                {[
                  'Become the leading provider in our industry',
                  'Expand our reach to global markets',
                  'Pioneer cutting-edge technologies and innovations',
                  'Create sustainable value for all stakeholders',
                  'Set new standards of excellence and service'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 group">
                    <div className="w-6 h-6 bg-[#f68712] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-[#06336e] transition-colors">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 leading-relaxed flex-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { name: 'Name', position: 'Position', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
              { name: 'Name', position: 'Position', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
              { name: 'Name', position: 'Position', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' },
              { name: 'Name', position: 'Position', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400' }
            ].map((member, index) => (
              <div 
                key={index}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4 aspect-square">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Work With Us?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button className="px-8 py-4 bg-[#f68712] text-white rounded-lg font-semibold hover:bg-[#d67510] transition-colors text-lg">
              Get In Touch
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutView;