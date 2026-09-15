import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiChevronUp, FiLogOut, FiUser } from "react-icons/fi";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { logout } from "@/services/api/authApi";
import { clearAuth } from "@/store/authSlice";
import type { AppDispatch, RootState } from "@/store";

export function SidebarUser() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);

    if (!user) {
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            dispatch(clearAuth());
            navigate("/login", { replace: true });
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger
                        render={
                            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
                                {user.profileImageUrl ? (
                                    <img src={user.profileImageUrl} alt={user.name} className="size-8 rounded-lg object-cover" />
                                ) : (
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                                        <FiUser className="size-4" />
                                    </div>
                                )}

                                <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>

                                    <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                                </div>

                                <FiChevronUp className="ml-auto size-4" />
                            </SidebarMenuButton>
                        }
                    />

                    <DropdownMenuContent side="top" align="start" className="w-56">
                        <div className="flex items-center gap-3 px-3 py-3">
                            {user.profileImageUrl ? (
                                <img src={user.profileImageUrl} alt={user.name} className="size-10 rounded-lg object-cover" />
                            ) : (
                                <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                                    <FiUser className="size-5" />
                                </div>
                            )}

                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">{user.name}</p>

                                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                            </div>
                        </div>

                        <DropdownMenuSeparator />

                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                            <FiLogOut className="mr-2 size-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
