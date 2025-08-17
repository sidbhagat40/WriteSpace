import React, { useEffect, useRef } from 'react';
import EditorJS, { type OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';

interface EditorProps {
  data?: OutputData;
  onChange: (data: OutputData) => void;
  holder: string;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, holder }) => {
  const editorInstance = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (!editorInstance.current) {
      const editor = new EditorJS({
        holder: holder,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
          embed: Embed,
          table: {
            class: Table,
            inlineToolbar: true,
          },
          marker: Marker,
          underline: Underline,
          inlineCode: InlineCode,
        },
        inlineToolbar: ['bold', 'italic', 'underline', 'link', 'marker', 'inlineCode'],
        data: data,
        async onChange(api, event) {
          const savedData = await api.saver.save();
          onChange(savedData);
        },
        onReady: () => {
          console.log('Editor.js is ready to work!');
        },
      });

      editorInstance.current = editor;
    }

    return () => {
      if (editorInstance.current && editorInstance.current.destroy) {
        editorInstance.current.destroy();
        editorInstance.current = null;
      }
    };
  }, []);

  return <div id={holder} style={{ width: '100%' }} />;
};

export default Editor;