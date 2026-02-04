import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Button from "@/public/Button.svg";
import Eye from "@/public/eye.svg";
import CircleCheck from "@/public/CircleCheck.svg";
import FilePenLine from "@/public/FilePenLine.svg";
import vector from "@/public/Vector.svg";

export default function CategoryTable({ categories }: { categories: any[] }) {
    return (
        <div className="mt-6 ">
            <Table>
                <TableHeader >
                    <TableRow className="border-b">
                        <TableHead></TableHead>
                        <TableHead>Category Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Slug</TableHead>
                        <TableHead>Articles</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {categories.map((cat, index) => (
                        <TableRow
                            key={index}

                        >
                            <TableCell>
                                <img src={cat.image} />
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <span className="font-medium">{cat.title}</span>
                                </div>
                            </TableCell>

                            <TableCell className="text-sm ">{cat.description}</TableCell>

                            <TableCell>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block
                                             ${cat.status === "Active"
                                            ? "border border-[#E4E4E7] bg-transparent"
                                            : "bg-[#F4F4F5]"
                                        }
                                      `}
                                >
                                    {cat.status || "Draft"}
                                </span>
                            </TableCell>
                            <TableCell className="text-sm">{cat.slug || "-"}</TableCell>
                            <TableCell className="text-sm">{cat.articles || 0}</TableCell>


                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <button className="h-8 w-8 flex items-center justify-center">
                                            <img src={Button.src ?? Button} />
                                        </button>
                                    </DropdownMenuTrigger>

                                   <DropdownMenuContent side="right" align="start" sideOffset={4} className="w-40">

                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <img src={Eye.src} className="h-4 w-4" />
                                            View
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <img src={FilePenLine.src} className="h-4 w-4" />
                                            Edit
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <img src={CircleCheck.src} className="h-4 w-4" />
                                            Publish
                                        </DropdownMenuItem>

                                        <DropdownMenuItem className="flex items-center gap-2">
                                            <img src={vector.src} className="h-4 w-4" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
