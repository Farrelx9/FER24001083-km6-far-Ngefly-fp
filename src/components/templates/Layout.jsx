import Navbar from '../organism/Navbar'

export default function Layout({ children }) {
  return (
    <div className="bg-[rgb(255,255,255)] pt-[93px]">
      <Navbar />
      <div>{children}</div>
    </div>
  );
}
