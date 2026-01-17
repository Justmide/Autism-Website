import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Target, Users as UsersIcon, Award, 
  BookOpen, Video, Award as AwardIcon,
  CheckCircle, GraduationCap, Users, ClipboardCheck,
  School, MessageCircle, Globe, ShieldCheck, Heart,
  Clock, Users as CohortUsers, Zap, Award as CertificateIcon,
  Calendar, Download, FileText
} from 'lucide-react';

const Programs = () => {
  const weeks = [
    {
      week: 1,
      title: 'Understanding Autism',
      description: 'What autism is, strength-based perspective, cultural myths & facts.',
      tags: ['Foundations', 'Perspective'],
      icon: Brain
    },
    {
      week: 2,
      title: 'Behavior & Communication',
      description: 'Why behaviors happen, replacing behavior with skills, communication strategies.',
      tags: ['Behavior', 'Communication'],
      icon: MessageCircle
    },
    {
      week: 3,
      title: 'Daily Routines & Structure',
      description: 'Visual schedules, transitions, reducing meltdowns.',
      tags: ['Routines', 'Structure'],
      icon: Calendar
    },
    {
      week: 4,
      title: 'Sensory Needs',
      description: 'Sensory profiles, home accommodations, regulation strategies.',
      tags: ['Sensory', 'Accommodations'],
      icon: Zap
    },
    {
      week: 5,
      title: 'Social Skills & Independence',
      description: 'Teaching play & interaction, self-help & life skills, building independence.',
      tags: ['Social', 'Independence'],
      icon: Users
    },
    {
      week: 6,
      title: 'School Advocacy & Next Steps',
      description: 'Working with schools, what to ask for, long-term planning.',
      tags: ['Advocacy', 'Planning'],
      icon: School
    }
  ];

  const programFeatures = [
    { icon: Clock, title: '90-minute Sessions', description: 'Weekly Zoom meetings' },
    { icon: CohortUsers, title: 'Small Cohort', description: '10–15 parents per group' },
    { icon: MessageCircle, title: 'WhatsApp Support', description: 'Daily community access' },
    { icon: Download, title: 'PDF Toolkit', description: 'Downloadable resources' }
  ];

  const bonuses = [
    { icon: FileText, title: 'Complete PDF Toolkit', description: 'All session materials and resources' },
    { icon: CertificateIcon, title: 'Certificate of Completion', description: 'Official certification for program completion' },
    { icon: Users, title: 'Coaching Discount', description: '20% off 1:1 parent coaching sessions' }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-sage/10 text-brand-navy font-medium text-sm mb-6">
            <span className="w-4 h-3 rounded-full bg-brand-gold"></span>
            PILOT 6-WEEK AUTISM PARENT PROGRAM • USA BASED
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-brand-navy mb-4">
            Understanding & Supporting Your Child with Autism
          </h1>
          <p className="text-lg text-brand-navy/70 max-w-3xl mx-auto">
            A 6-week journey designed to equip parents with practical knowledge, strategies, and confidence to support their child's development effectively.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-sage/10 rounded-full">
              <Calendar className="w-4 h-4 text-brand-sage" />
              <span className="text-sm font-medium">6 Weeks</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-sage/10 rounded-full">
              <Clock className="w-4 h-4 text-brand-sage" />
              <span className="text-sm font-medium">90-Minute Weekly Sessions</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-brand-sage/10 rounded-full">
              <CohortUsers className="w-4 h-4 text-brand-sage" />
              <span className="text-sm font-medium">Small Cohort (10-15 Parents)</span>
            </div>
          </div>
        </motion.div>

        {/* Program Format */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-sage/20 to-brand-navy/5 rounded-3xl p-8 md:p-12 mb-12 border border-brand-sage/30"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-brand-navy mb-4">Program Format</h2>
            <p className="text-brand-navy/70 max-w-2xl mx-auto">
              Expert-led sessions combined with community support for maximum learning and application
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-card transition-all"
              >
                <div className="w-12 h-12 bg-brand-sage/20 rounded-full flex items-center justify-center text-brand-sage mx-auto mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">{feature.title}</h3>
                <p className="text-brand-navy/60 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Week-by-Week Breakdown */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-brand-navy mb-8 text-center">Week-by-Week Breakdown</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {weeks.map((week, index) => (
              <motion.div
                key={week.week}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 border border-brand-navy/10 hover:shadow-card transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-navy text-white rounded-xl flex items-center justify-center font-bold">
                    {week.week}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <week.icon className="w-5 h-5 text-brand-sage" />
                      <h3 className="text-lg font-bold text-brand-navy">{week.title}</h3>
                    </div>
                    <p className="text-brand-navy/70 text-sm mb-3">{week.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {week.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1 bg-brand-sage/10 text-brand-sage text-xs font-medium rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bonuses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-brand-sage/10 rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 className="text-2xl font-bold text-brand-navy mb-6 text-center">Program Bonuses</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {bonuses.map((bonus, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-card transition-all"
              >
                <div className="w-16 h-16 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold mx-auto mb-4">
                  <bonus.icon className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-brand-navy mb-2">{bonus.title}</h3>
                <p className="text-brand-navy/70 text-sm">{bonus.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          {/* Early Bird */}
          <div className="bg-white rounded-3xl p-8 border-2 border-brand-gold shadow-card relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-brand-gold text-white text-xs font-bold rounded-full">
              MOST POPULAR
            </div>
            <div className="text-center mb-6">
              <div className="inline-block px-4 py-1 bg-brand-gold/20 text-brand-gold text-sm font-bold rounded-full mb-4">
                EARLY BIRD SPECIAL
              </div>
              <h3 className="text-2xl font-bold text-brand-navy mb-2">Limited Time Offer</h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-brand-navy">$180</span>
              </div>
              <p className="text-brand-navy/60 line-through">Regular: $250</p>
              <p className="text-sm text-brand-navy/70 mt-2">Save $70 with early enrollment</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                '6 weekly 90-minute Zoom sessions',
                'Small cohort of 10-15 parents',
                'WhatsApp support community',
                'All bonuses included'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-gold flex-shrink-0 mt-0.5" />
                  <span className="text-brand-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-gold text-white py-4 rounded-full font-bold hover:bg-brand-gold/90 transition-colors shadow-lg"
            >
              Enroll Now - Save $70
            </motion.button>
          </div>

          {/* Regular */}
          <div className="bg-white rounded-3xl p-8 border border-brand-navy/10 shadow-soft">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-brand-navy mb-2">Regular Pricing</h3>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-4xl font-bold text-brand-navy">$250</span>
              </div>
              <p className="text-brand-navy/60">Full program access</p>
            </div>
            <ul className="space-y-3 mb-8">
              {[
                '6 weekly 90-minute Zoom sessions',
                'Small cohort of 10-15 parents',
                'WhatsApp support community',
                'All bonuses included'
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-sage flex-shrink-0 mt-0.5" />
                  <span className="text-brand-navy/80">{item}</span>
                </li>
              ))}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-brand-navy text-white py-4 rounded-full font-bold hover:bg-brand-sage transition-colors"
            >
              Enroll Now
            </motion.button>
          </div>
        </motion.div>

        {/* Branding & Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-navy to-brand-sage rounded-3xl p-8 md:p-12 text-white mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="lg:w-2/3">
                <div className="flex items-center gap-3 mb-4">
                  <Award className="w-8 h-8" />
                  <h3 className="lg:text-2xl text-lg font-bold">U.S. Trained Expert Facilitation</h3>
                </div>
                <p className="lg:text-lg text-[14px] mb-6">
                  This program is led by a U.S.-trained Educational Diagnostician and Special Education Specialist 
                  providing autism education, parent coaching, and functional support for families worldwide.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 lg:text-lg text-[14px] ">
                    <CheckCircle className="w-5 h-5 text-brand-gold" />
                    <span className="font-medium lg:text-lg text-[14px] ">U.S. Education Standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-gold" />
                    <span className="font-medium">Evidence-Based Strategies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-gold" />
                    <span className="font-medium">Practical, Real-World Focus</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-brand-gold" />
                    <span className="font-medium">Cultural Sensitivity</span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/3 bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-4xl font-bold mb-2">SpedEveryday</div>
                <p className="text-sm mb-4 opacity-90">Parent Brand</p>
                <div className="border-t border-white/20 pt-4">
                  <div className="text-lg font-semibold mb-1">Sub-Brand</div>
                  <p className="text-sm opacity-80">SpedEveryday Autism Support – Africa & Diaspora</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm italic">"Practical Autism Support for Families Everywhere."</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Money Back Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-brand-sage to-brand-navy/90 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center lg:gap-4 gap-2 mb-6">
              <ShieldCheck className="w-12 h-12" />
              <h3 className="lg:text-2xl text-lg font-bold">14-Day Satisfaction Guarantee</h3>
            </div>
            <p className="lg:text-lg text-[14px] mb-6">
              We're confident you'll find immense value in our pilot program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">. 
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">14</div>
                <div className="text-sm text-white/80">Day Guarantee</div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">2</div>
                <div className="text-sm text-white/80">Sessions Included</div>
              </div>
              <div className="hidden sm:block h-12 w-px bg-white/30"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
