import React, { useEffect, useRef } from 'react';
import EditorJS, { type OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Embed from '@editorjs/embed';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';
import EditorjsList from '@editorjs/list';

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
          class: EditorjsList,
          inlineToolbar: true,
          shortcut: 'CMD+SHIFT+L',
          toolbox: [
            {
              title: 'Ordered List',
              data: {
                style: 'ordered',
              }
            },
            {
              title: 'Unordered List',
              data: {
                style: 'unordered',
              }
            }
          ]
        },
          embed: Embed,
          marker: Marker,
          underline: Underline,
          inlineCode: InlineCode,
        },
        inlineToolbar: ['bold', 'italic', 'underline', 'link', 'marker', 'inlineCode'],
        
        data: data,
        async onChange(api, _event) {
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