import {
  LayoutDashboard,
  Droplet,
  Flame,
  Zap,
  Cpu,
  Users,
  Bell,
  Sun,
  Menu,
  Settings,
  LineChart,
  LogOut
} from "lucide-react";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Gas", icon: Flame },
  { name: "Water", icon: Droplet },
  { name: "Energy", icon: Zap },
  { name: "Solar", icon: Sun },
  { name: "Analysis", icon: LineChart },
  { name: "Alerts", icon: Bell },
  { name: "Settings", icon: Settings }
];

export default function Sidebar({
  collapsed,
  setCollapsed,
  activePage,
  setActivePage
}) {
  return (
    <aside
      id="sidebar"
      className={`
        bg-slate-900/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 shadow-xl z-50
        ${collapsed ? "w-20" : "w-64"}
        flex flex-col min-h-full fixed left-0 top-0 h-full
      `}
    >
      {/* Logo */}
      <div className={`h-16 flex items-center shrink-0 transition-all duration-300 overflow-hidden ${collapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <img
              src="https://www.embel.co.in/images/logos/logo-embel.png"
              alt="Embel Logo"
              className="h-8 object-contain"
            />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all ${collapsed ? 'mx-auto' : ''}`}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-2 py-3 overflow-visible flex flex-col gap-1">
        {menu.map((item) => (
          <button
            key={item.name}
            onClick={() => setActivePage(item.name)}
            title={collapsed ? item.name : ""}
            className={`
              flex items-center gap-3 w-full px-3 py-2 rounded-lg transition group relative
              ${activePage === item.name
                ? "bg-blue-600/20 text-blue-400 font-semibold shadow-[0_0_15px_rgba(37,99,235,0.2)] border border-blue-500/20"
                : "text-slate-400 hover:bg-white/5 hover:text-white"}
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <item.icon
              size={20}
              className={`
                    transition-colors
                    ${activePage === item.name ? "text-blue-400 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]" : "group-hover:text-slate-300"}
                `}
            />
            {!collapsed && (
              <span className="text-sm whitespace-nowrap">{item.name}</span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 shrink-0 text-center">
        <p className="text-xs text-slate-500 whitespace-nowrap overflow-hidden">
          {collapsed ? "©" : "© 2026 Embel Tech"}
        </p>
      </div>
    </aside>
  );
}
