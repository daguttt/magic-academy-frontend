'use client';
import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import DragDropArea from './drag-drop-area';
import SaveButton from './save-button';

const Editor = () => {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <div className="flex-1 p-6">
        <Tabs.Root defaultValue="article" className="w-full">
          <Tabs.List className="flex gap-4">
            <Tabs.Trigger
              value="video"
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Video
            </Tabs.Trigger>
            <Tabs.Trigger
              value="article"
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Artículo
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="video" className="mt-4">
            <DragDropArea />
          </Tabs.Content>

          <Tabs.Content value="article" className="mt-4">
            <div className="editor rounded-lg border border-input p-4">
              <h2 className="text-lg font-bold">Escribe el articulo</h2>
              <textarea
                className="mt-2 h-64 w-full rounded-lg border border-input bg-background p-2 text-foreground"
                placeholder="Escribe aquí..."
              />
            </div>
          </Tabs.Content>
        </Tabs.Root>

        {/* Guardar Button */}
        <SaveButton label="Guardar" />
      </div>
    </div>
  );
};

export default Editor;
