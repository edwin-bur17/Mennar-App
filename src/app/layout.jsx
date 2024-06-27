import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ModuleProvider } from "@/context/moduleContext";
import { SearchFormProvider } from "@/context/searchFormContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mennar App"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ModuleProvider>
          <SearchFormProvider>
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-5 transition-all duration-300 bg-gray-700 my-5 mr-5 rounded-lg">
                {children}
              </main>
            </div>
          </SearchFormProvider>
        </ModuleProvider>
      </body>
    </html>
  );
}
