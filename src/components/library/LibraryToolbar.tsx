import { FiSearch } from "react-icons/fi";

import { Input } from "@/components/ui/input";

interface LibraryToolbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

const LibraryToolbar = ({ search, onSearchChange }: LibraryToolbarProps) => {
    return (
        <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search documents..." className="pl-9" />
        </div>
    );
};

export default LibraryToolbar;
