'use client'
import React from "react";
import DragDropArea from "./DragDropArea";
import * as Tabs from "@radix-ui/react-tabs";
import SaveButton from "./save-button";

const Editor = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      
      <div className="flex-1 p-6">
        <Tabs.Root defaultValue="article" className="w-full">
          <Tabs.List className="flex gap-4">
            <Tabs.Trigger value="video" className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors">Video</Tabs.Trigger>
            <Tabs.Trigger value="article" className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-foreground hover:text-primary transition-colors">Artículo</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="video" className="mt-4">
            <DragDropArea />
          </Tabs.Content>

          <Tabs.Content value="article" className="mt-4">
            <div className="editor border border-input p-4 rounded-lg">
              <h2 className="text-lg font-bold">Escribe el articulo</h2>
              <textarea className="w-full h-64 mt-2 border border-input p-2 rounded-lg bg-background text-foreground" placeholder="Escribe aquí..." />
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
