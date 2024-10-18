import { Facebook, Instagram, MessageSquare } from "lucide-react";

export default function FooterBodyDown() {
  return (
    <div className="bg-foreground text-white">

      <div className="flex flex-wrap justify-around items-center mt-16">
        <div className="flex flex-col justify-center gap-1 mx-4">
          <h1 className="text-2xl font-medium tracking-wide">
            Sign Up To Our Newsletter.
          </h1>
          <p className="text-sm">Be the first to hear about our latest offers.</p>
        </div>
        <form>
          <div className="flex items-center justify-center gap-3 mt-6 md:mt-0">
            <input
              type="email"
              placeholder="Your Email"
              required
              className="border-none text-white bg-transparent px-4 outline outline-2 outline-white focus:outline-[#4da6ff] rounded-md w-[221px] h-10 text-lg placeholder-white"
            />
            <button
              type="submit"
              className="bg-[#0156FF] rounded-full px-6 py-2.5 text-base font-medium cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-100"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-6 justify-between mt-10 sm:max-w-[90vw] sm:mx-auto">
        <ul className="flex flex-col gap-1 ml-[8.5%]">
          <h2 className="text-xl font-medium tracking-wider">Products</h2>
          <li>Sunglass</li>
          <li>Belt</li>
          <li>Perfume</li>
          <li>Wristwatch</li>
          <li>About Us</li>
        </ul>
        <ul className="flex flex-col gap-1 max-w-[310px] ml-[8.5%] sm:mr-[80px]">
          <h2 className="text-xl font-medium tracking-wider">Address</h2>
          <li>Address: 123 best address waterline</li>
          <li>Phones: (234) 700 000</li>
          <li>We are open: Monday-Friday: 9:00 AM - 6:00PM</li>
          <li>Saturday: 10:00 AM - 5:00 PM</li>
          <li>E-mail: support@email.com</li>
        </ul>
      </div>

      <div className="flex mt-8 justify-center mx-[8.5%]">
        <div className="flex gap-4">
          <Facebook alt="facebook icon" />
          <Instagram alt="instagram icon" />
          <MessageSquare alt="whatsapp icon" />
        </div>
      </div>

      {/* Horizontal Rule */}
      <hr className="border-[1.3px] border-gray-700 opacity-30 mx-[8.5%] mt-5 mb-10" />

      {/* Social Icons and Copyright */}
      <div className="flex justify-center mx-[8.5%] mb-3">
        <p className="text-sm">&copy; 2024 Deewhy. Ltd.</p>
      </div>
    </div>
  );
}
