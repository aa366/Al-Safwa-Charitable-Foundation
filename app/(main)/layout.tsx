import Navbar from "@/components/nav-bar";
// import Footer from "@/components/footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
          <Navbar /> 
          <main className="bg-[hsl(216,24%,96%)] min-h-screen  " >
            {children}
          </main>
            {/* <Footer /> */}
            </>
         
  );
}
