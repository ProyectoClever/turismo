import { AccountPlaceholder } from "@/components/account/account-placeholder";

export const metadata = {
  title: "Favoritos | TurismoGo",
};

export default function FavoritosPage() {
  return (
    <AccountPlaceholder
      title="Favoritos"
      description="Aquí podrás guardar tours y destinos para consultarlos después."
    />
  );
}
