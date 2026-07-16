"use client";

import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
	AlignCenter,
	AlignJustify,
	AlignLeft,
	AlignRight,
	Bold,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	List,
	ListOrdered,
	Redo,
	Underline as UnderlineIcon,
	Undo,
} from "lucide-react";

interface RichTextEditorProps {
	content: string;
	onChange: (html: string) => void;
}

function ToolbarButton({
	onClick,
	active,
	disabled,
	title,
	children,
}: {
	onClick: () => void;
	active?: boolean;
	disabled?: boolean;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			title={title}
			className={`p-1.5 rounded-md transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed ${
				active ? "bg-green-600 text-white" : "text-gray-600 hover:bg-gray-200"
			}`}
		>
			{children}
		</button>
	);
}

function Toolbar({ editor }: { editor: Editor | null }) {
	if (!editor) return null;

	return (
		<div className="flex flex-wrap items-center gap-1 border border-gray-400 border-b-0 rounded-t-md bg-gray-50 p-1.5">
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBold().run()}
				active={editor.isActive("bold")}
				title="Bold"
			>
				<Bold size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleItalic().run()}
				active={editor.isActive("italic")}
				title="Italic"
			>
				<Italic size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleUnderline().run()}
				active={editor.isActive("underline")}
				title="Underline"
			>
				<UnderlineIcon size={15} />
			</ToolbarButton>

			<div className="w-px h-5 bg-gray-300 mx-1" />

			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
				active={editor.isActive("heading", { level: 1 })}
				title="Heading 1"
			>
				<Heading1 size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
				active={editor.isActive("heading", { level: 2 })}
				title="Heading 2"
			>
				<Heading2 size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
				active={editor.isActive("heading", { level: 3 })}
				title="Heading 3"
			>
				<Heading3 size={15} />
			</ToolbarButton>

			<div className="w-px h-5 bg-gray-300 mx-1" />

			<ToolbarButton
				onClick={() => editor.chain().focus().toggleBulletList().run()}
				active={editor.isActive("bulletList")}
				title="Bullet list"
			>
				<List size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
				active={editor.isActive("orderedList")}
				title="Numbered list"
			>
				<ListOrdered size={15} />
			</ToolbarButton>

			<div className="w-px h-5 bg-gray-300 mx-1" />

			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("left").run()}
				active={editor.isActive({ textAlign: "left" })}
				title="Align left"
			>
				<AlignLeft size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("center").run()}
				active={editor.isActive({ textAlign: "center" })}
				title="Align center"
			>
				<AlignCenter size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("right").run()}
				active={editor.isActive({ textAlign: "right" })}
				title="Align right"
			>
				<AlignRight size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().setTextAlign("justify").run()}
				active={editor.isActive({ textAlign: "justify" })}
				title="Justify"
			>
				<AlignJustify size={15} />
			</ToolbarButton>

			<div className="w-px h-5 bg-gray-300 mx-1" />

			<ToolbarButton
				onClick={() => editor.chain().focus().undo().run()}
				disabled={!editor.can().undo()}
				title="Undo"
			>
				<Undo size={15} />
			</ToolbarButton>
			<ToolbarButton
				onClick={() => editor.chain().focus().redo().run()}
				disabled={!editor.can().redo()}
				title="Redo"
			>
				<Redo size={15} />
			</ToolbarButton>
		</div>
	);
}

export default function RichTextEditor({
	content,
	onChange,
}: RichTextEditorProps) {
	const editor = useEditor({
		immediatelyRender: false,
		extensions: [
			StarterKit,
			Underline,
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			Placeholder.configure({
				placeholder: "Compose your article...",
			}),
		],
		content,
		editorProps: {
			attributes: {
				class:
					"max-w-none font-mono text-xs focus:outline-none min-h-[260px] px-3 py-2 leading-relaxed [&_p]:my-2 [&_strong]:font-bold [&_em]:italic [&_u]:underline [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-base [&_h3]:font-bold [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5",
			},
		},
		onUpdate: ({ editor }) => {
			onChange(editor.getHTML());
		},
	});

	return (
		<div className="w-full">
			<Toolbar editor={editor} />
			<div className="border border-gray-400 rounded-b-md focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
