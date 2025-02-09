import { HouseIcon, UsersRoundIcon, WrenchIcon } from "lucide-react";

const navMenuList = () => [
  {
    label: "Chamados",
    path: "/dashboard/home",
    icon: HouseIcon,
  },
  {
    label: "Clientes",
    path: "/dashboard/customers",
    icon: UsersRoundIcon,
  },
  {
    label: "Perfil",
    path: "/dashboard/profile",
    icon: WrenchIcon,
  },
];

export const loadNavMenu = navMenuList();
