'use client';

import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const { data: session } = useSession();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Perfect for trying out Markmap AI',
      features: [
        'Generate up to 2 mindmaps',
        'Basic mindmap customization',
        'Export as PNG',
        'Community support',
      ],
      action: session ? 'Current Plan' : 'Get Started',
      disabled: true,
    },
    {
      name: 'Premium',
      price: '$9.99',
      period: 'month',
      description: 'For power users who need more features',
      features: [
        'Unlimited mindmaps',
        'Advanced customization options',
        'Export in multiple formats',
        'Priority support',
        'Save and organize mindmaps',
        'Collaboration features',
      ],
      action: 'Upgrade Now',
      disabled: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
            Pricing Plans
          </h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Choose the perfect plan for your needs
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-200 ${
                plan.name === 'Premium'
                  ? 'border-2 border-blue-500 relative'
                  : 'border border-gray-200'
              }`}
            >
              {plan.name === 'Premium' && (
                <div className="absolute top-0 right-0 -translate-y-1/2">
                  <span className="inline-flex rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold leading-5 text-blue-800">
                    Popular
                  </span>
                </div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold leading-6 text-gray-900">
                  {plan.name}
                </h2>
                <p className="mt-4 text-sm text-gray-500">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base font-medium text-gray-500">
                      /{plan.period}
                    </span>
                  )}
                </p>
                <Button
                  className="mt-8 w-full"
                  variant={plan.name === 'Premium' ? 'default' : 'outline'}
                  disabled={plan.disabled}
                >
                  {plan.action}
                </Button>
              </div>
              <div className="pt-6 pb-8 px-6">
                <h3 className="text-xs font-medium text-gray-900 tracking-wide uppercase">
                  What's included
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex space-x-3">
                      <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 