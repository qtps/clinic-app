import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <BookingForm />
      </Suspense>
      <Footer />
    </>
  );
}
