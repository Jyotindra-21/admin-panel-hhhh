import "./styles.css";
import { toast } from "react-toastify";
import axios from "axios";

// import { Color } from "@tiptap/extension-color";
// import ListItem from "@tiptap/extension-list-item";
// import TextStyle from "@tiptap/extension-text-style";
// import { useCurrentEditor, useEditor, EditorContent } from "@tiptap/react";
// import Underline from "@tiptap/extension-underline";
// import StarterKit from "@tiptap/starter-kit";
// import TextAlign from "@tiptap/extension-text-align";
// import React from "react";

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
  const [defaultValue, setDefaultValue] = useState("");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://admin-panel-hadramaut-react-f4r8.vercel.app/view/privacynpolicy");
        const data = response.data;
        console.log("Fetched data:", data);

        // Assuming jsonData is an array, check its length before accessing properties
        if (Array.isArray(data) && data.length > 0) {
          setDefaultValue(data[0].html);
        } else {
          console.error("Data is not in the expected format or is empty.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []); // Empty dependency array to ensure useEffect runs only once

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
    content: defaultValue,
  });

  async function handlePublish() {
    setLoading(true)
    const html = editor?.getHTML();
    try {
      const res = await axios.post(
        "https://admin-panel-hadramaut-react-f4r8.vercel.app/create/newslettercontent",
        { "html": html },
        {
          headers: getHeaders(),
        }
      );
      setLoading(false);
      if (res.status !== 200) return toast.error("Error while sending email");
      toast.success("Sent mails!");
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
