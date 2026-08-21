import { Head, Link } from "@inertiajs/react";
import { Table, Chip, Tooltip, SearchField, Button, IconPlus } from "@heroui/react";
import type { ChipProps } from "@heroui/react";
import { useMemo, useState } from "react";
import NewFileModal from "../../components/files/NewFileModal";
import EditFileModal from "../../components/files/EditFileModal";

import {Pencil, TrashBin} from "@gravity-ui/icons";
import { StoredFile } from "@/types/serializers";
import RemoveFileModal from "../../components/files/RemoveFileModal";

interface IndexProps {
  files: StoredFile[];
}

type FileAction =
  | { type: "edit"; file: StoredFile }
  | { type: "remove"; file: StoredFile }
  | null;


// v3 Chip colors: "default" | "accent" | "success" | "warning" | "danger"
const statusColorMap: Record<string, ChipProps["color"]> = {
  uploading: "default",
  processing: "warning",
  completed: "success",
  failed: "danger",
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

function truncateHash(hash: string | null) {
  if (!hash) return "—";
  return hash.length > 12 ? `${hash.slice(0, 6)}…${hash.slice(-6)}` : hash;
}

export default function Index({ files }: IndexProps) {
  const [query, setQuery] = useState("");
  const [isNewFileOpen, setIsNewFileOpen] = useState(false);
  const [fileAction, setFileAction] = useState<FileAction>(null);
  const closeFileAction = () => setFileAction(null);



  const filteredFiles = useMemo(() => {
    if (!query.trim()) return files;
    const q = query.toLowerCase();
    return files.filter((file) => {
      return (
        file.name?.toLowerCase().includes(q) ||
        file.description?.toLowerCase().includes(q) ||
        file.status.toLowerCase().includes(q)
      );
    });
  }, [files, query]);

  return (
    <>
      <Head title="Files" />
      <NewFileModal isOpen={isNewFileOpen} onOpenChange={setIsNewFileOpen} />
      {fileAction?.type === "edit" && (
        <EditFileModal storedFile={fileAction.file} onOpenChange={closeFileAction} />
      )}
      {fileAction?.type === "remove" && (
        <RemoveFileModal storedFile={fileAction.file} onOpenChange={closeFileAction} />
      )}

      <div className="p-6 max-w-6xl mx-auto flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Files</h1>
            <p className="text-sm text-default-500">
              {files.length} file{files.length === 1 ? "" : "s"} total
            </p>
          </div>

          <div className="flex items-center gap-4">
            <SearchField name="search" onChange={(e) => setQuery(e)} value={query} fullWidth aria-label="Search files">
                  <SearchField.Group>
                    <SearchField.SearchIcon />
                    <SearchField.Input placeholder="Search..." />
                    <SearchField.ClearButton />
                  </SearchField.Group>
            </SearchField>
            <Button variant="primary" onPress={() => setIsNewFileOpen(true)}>
              <IconPlus className="w-4 h-4" />
              Upload File
            </Button>
          </div>
        </div>

        <Table>
          <Table.ScrollContainer>
            <Table.Content aria-label="Files table">
              <Table.Header>
                <Table.Column isRowHeader id="name">NAME</Table.Column>
                <Table.Column id="description">DESCRIPTION</Table.Column>
                <Table.Column id="status">STATUS</Table.Column>
                <Table.Column id="file_hash">HASH</Table.Column>
                <Table.Column id="created_at">CREATED AT</Table.Column>
                <Table.Column id="updated_at">UPDATED AT</Table.Column>
                <Table.Column className="text-end">ACTIONS</Table.Column>
              </Table.Header>

              <Table.Body
                items={filteredFiles}
                renderEmptyState={() => (
                  <p className="text-center py-8 text-default-500">
                    {query
                      ? "No files match your search."
                      : "No files have been uploaded yet."}
                  </p>
                )}
              >
                {(file) => (
                  <Table.Row id={file.id}>
                    <Table.Cell>
                      <Link
                        href={`/files/${file.id}`}
                        className="font-medium text-foreground hover:underline"
                      >
                        {file.name ?? "Untitled"}
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-default-500 line-clamp-1 max-w-xs block">
                        {file.description || "—"}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <Chip
                        size="sm"
                        variant="soft"
                        color={statusColorMap[file.status] ?? "default"}
                        className="capitalize"
                      >
                        {file.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell>
                      <Tooltip delay={200}>
                        <Tooltip.Trigger>
                          <span className="font-mono text-xs text-default-500">
                            {truncateHash(file.file_hash)}
                          </span>
                        </Tooltip.Trigger>
                        <Tooltip.Content>
                          <p>{file.file_hash || "No hash yet"}</p>
                        </Tooltip.Content>
                      </Tooltip>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-default-500 text-sm">
                        {formatDate(file.created_at)}
                      </span>
                    </Table.Cell>

                    <Table.Cell>
                      <span className="text-default-500 text-sm">
                        {formatDate(file.updated_at)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-1">
                        <Button isIconOnly size="sm" variant="tertiary" aria-label="Edit file" onClick={() => {setFileAction({ type: "edit", file })}}>
                          <Pencil className="size-4" />
                        </Button>
                        <Button isIconOnly size="sm" variant="danger-soft" aria-label="Remove file" onClick={() => {setFileAction({ type: "remove", file })}}>
                          <TrashBin className="size-4" />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Content>
          </Table.ScrollContainer>
        </Table>
      </div>
    </>
  );
}
