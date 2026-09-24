import { PageTransition } from "@/components/page-transition";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WebMcpTools } from "@/components/web-mcp-tools";
import { AGENT_DOCS_DIRECTIVE_TEXT } from "@/lib/agent-discovery/directive";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="relative flex min-h-svh flex-col bg-background">
    <blockquote className="sr-only">{AGENT_DOCS_DIRECTIVE_TEXT}</blockquote>
    <WebMcpTools />

    <SiteHeader />

    <PageTransition>
      <main className="flex flex-1 flex-col">{children}</main>
    </PageTransition>

    <SiteFooter />
  </div>
);

export default AppLayout;
