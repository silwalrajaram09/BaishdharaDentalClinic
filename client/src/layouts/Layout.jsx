import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className="grow"
        style={{ paddingTop: "var(--header-height, 4rem)" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
