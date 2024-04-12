import "./styles.css";
import { toast } from "react-toastify";
import axios from "axios";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import "./styles.css";

import {
  FaAlignCenter,
  FaAlignLeft,
  FaAlignRight,
  FaBold,
  FaItalic,
  FaList,
  FaListOl,
  FaParagraph,
  FaUnderline,
} from "react-icons/fa";
import { RiFontSize } from "react-icons/ri";
import { useEffect, useState } from "react";
import getHeaders from "../../../helpers/getReqHeaders";

function MenuBar({ editor }) {
  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="menubar flex gap-3">
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <RiFontSize />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive("underline") ? "is-active" : ""}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          <FaParagraph />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <FaList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <FaAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={
            editor.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <FaAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "is-active" : ""}
        >
          <FaAlignRight />
        </button>
      </div>
    </>
  );
}

export default function TipTap() {
  const [loading, setLoading] = useState(false)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Color.configure({
        types: ["textStyle"],
      }),
    ],
    injectCSS: true,
    content:
      "<p>Hello World! 🌎️</p><h2>This is Heading...</h2><p>This is some text and this should <strong>bold</strong> <em>italic</em> and <u>underline.</u></p><ul><li><p>This is Unordered List</p></li><li><p>This is also</p></li></ul><ol><li><p>This is Ordered List</p></li><li><p>This is alos</p></li></ol><p><s>This text is removed.</s></p><blockquote><p>This is blockquote..</p></blockquote>",
  });

  async function handlePublish() {
    setLoading(true)
    const html = editor?.getHTML();
    try {
      const res = await axios.put(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/update/privacynpolicy",
        { "html": html },
        {
          headers: getHeaders(),
        }
      );
      setLoading(false);
      if (res.status !== 200) return toast.error("Error in adding voucher");
      toast.success("Privacy Policy Updated!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <button
        disabled={loading}
        onClick={handlePublish} className="save_btn">
        Save
      </button>
    </>
  );
}
