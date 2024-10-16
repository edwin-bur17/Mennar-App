import Sidebar from "@/components/sidebar/Sidebar";
import { ModuleProvider } from "@/context/moduleContext";
import { SearchFormProvider } from "@/context/searchFormContext";
import { PaginationProvider } from "@/context/paginationContext";
import { ModalProvider } from "@/context/modalContext";

export default function DashboardLayout({ children }) {
  return (
      <ModuleProvider>
        <PaginationProvider>
          <ModalProvider>
            <SearchFormProvider>
              <div className="flex h-screen overflow-hidden bg-primary">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-3 transition-all duration-300 bg-secondary my-5 mr-5 rounded-lg relative">
                  {children}
                </main>
              </div>
            </SearchFormProvider>
          </ModalProvider>
        </PaginationProvider>
      </ModuleProvider>
  );
}