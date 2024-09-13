import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  Zap,
  Radio,
  HeadphonesIcon,
  TrendingUpIcon,
  ShieldIcon,
  CheckCircleIcon,
} from "lucide-react";
import Link from "next/link";
import Redirect from "./components/Redirect";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <Redirect />
      <main className="flex-1">
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 xl:py-48 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
                  Empower Your Audience with Music Choice
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  MusicStreamChoice revolutionizes your streams by letting fans
                  pick the soundtrack. Boost engagement, interaction, and create
                  unforgettable experiences.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-gray-800 border-gray-700"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Get Started
                  </Button>
                </form>
                <p className="text-xs text-gray-400">
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="features"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Why Creators Love Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <Users className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Engage Your Audience</h3>
                <p className="text-gray-400">
                  Let your fans be part of the experience by choosing the music,
                  creating a more interactive and engaging stream.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <Zap className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Boost Interaction</h3>
                <p className="text-gray-400">
                  Increase viewer retention and participation in your streams
                  with real-time music requests and voting.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <Radio className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Seamless Integration</h3>
                <p className="text-gray-400">
                  Works flawlessly with popular streaming platforms and music
                  services, ensuring a smooth experience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <HeadphonesIcon className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">
                  Extensive Music Library
                </h3>
                <p className="text-gray-400">
                  Access millions of tracks from various genres, ensuring
                  there&#39;s something for every audience.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <TrendingUpIcon className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Analytics Dashboard</h3>
                <p className="text-gray-400">
                  Gain insights into your audience&#39;s music preferences and
                  stream performance with detailed analytics.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <ShieldIcon className="h-12 w-12 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Content Moderation</h3>
                <p className="text-gray-400">
                  Built-in tools to ensure appropriate song selections and
                  maintain a positive streaming environment.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-950"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              How It Works
            </h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-purple-500"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                <div className="flex flex-col items-center text-center md:items-end md:text-right">
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Connect Your Accounts
                  </h3>
                  <p className="text-gray-400">
                    Link your streaming and music service accounts to
                    MusicStreamChoice.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left mt-8 md:mt-32">
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-2">Set Up Your Stream</h3>
                  <p className="text-gray-400">
                    Customize your music settings and moderation preferences.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-end md:text-right mt-8 md:mt-32">
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                    3
                  </div>
                  <h3 className="text-xl font-bold mb-2">Fans Request Songs</h3>
                  <p className="text-gray-400">
                    Your audience can browse and request songs during your
                    stream.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left mt-8 md:mt-32">
                  <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-bold mb-4 relative z-10">
                    4
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Music Plays Automatically
                  </h3>
                  <p className="text-gray-400">
                    Approved songs are added to your queue and play seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              What Creators Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Creator 1"
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-400 mb-4">
                  &#34;MusicStreamChoice has transformed my streams. My viewers
                  love being able to choose the music, and it&#39;s increased my
                  engagement significantly!&#34;
                </p>
                <h4 className="font-bold">Alex Johnson</h4>
                <p className="text-sm text-gray-500">Gaming Streamer</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Creator 2"
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-400 mb-4">
                  &#34;The integration is seamless, and the music library is
                  extensive. It&#39;s become an essential tool for my art
                  streams!&#34;
                </p>
                <h4 className="font-bold">Sarah Lee</h4>
                <p className="text-sm text-gray-500">Art Streamer</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-gray-800 rounded-lg">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Creator 3"
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-gray-400 mb-4">
                  &#34;The analytics provided by MusicStreamChoice have helped
                  me understand my audience better. It&#39;s a
                  game-changer!&#34;
                </p>
                <h4 className="font-bold">Mike Thompson</h4>
                <p className="text-sm text-gray-500">Talk Show Host</p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="pricing"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-950"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Choose Your Plan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col p-6 bg-gray-800 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Starter</h3>
                <p className="text-4xl font-bold mb-4">
                  $9.99<span className="text-lg font-normal">/month</span>
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Up to 1000 song requests/month
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Basic analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Email support
                  </li>
                </ul>
                <Button className="mt-auto">Get Started</Button>
              </div>
              <div className="flex flex-col p-6 bg-purple-900 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Pro</h3>
                <p className="text-4xl font-bold mb-4">
                  $24.99<span className="text-lg font-normal">/month</span>
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Unlimited song requests
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Advanced analytics
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Custom branding
                  </li>
                </ul>
                <Button className="mt-auto bg-purple-600 hover:bg-purple-700">
                  Get Started
                </Button>
              </div>
              <div className="flex flex-col p-6 bg-gray-800 rounded-lg">
                <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                <p className="text-4xl font-bold mb-4">Custom</p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    All Pro features
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    Custom integrations
                  </li>
                  <li className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />{" "}
                    SLA
                  </li>
                </ul>
                <Button className="mt-auto">Contact Sales</Button>
              </div>
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="w-full flex justify-center py-12 md:py-24 lg:py-32 bg-gray-900"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  How does song moderation work?
                </h3>
                <p className="text-gray-400">
                  Our system includes built-in content filters and allows you to
                  set custom rules for song approval.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Which streaming platforms are supported?
                </h3>
                <p className="text-gray-400">
                  We support major platforms including Twitch, YouTube, and
                  Facebook Gaming.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Can I use my own music library?
                </h3>
                <p className="text-gray-400">
                  Yes, you can integrate your personal music library alongside
                  our extensive catalog.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Is there a limit to how many songs can be requested?
                </h3>
                <p className="text-gray-400">
                  Limits vary by plan. Our Pro and Enterprise plans offer
                  unlimited song requests.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 flex justify-center lg:py-32 bg-purple-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Revolutionize Your Streams?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join MusicStreamChoice today and give your audience the power
                  to create the perfect soundtrack.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1 bg-white text-gray-900"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Sign Up
                  </Button>
                </form>
                <p className="text-xs text-gray-300">
                  Start your 14-day free trial. No credit card required.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-700">
        <p className="text-xs text-gray-400">
          © 2023 MusicStreamChoice. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Cookie Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
