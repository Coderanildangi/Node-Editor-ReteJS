import { createRoot } from "react-dom/client";
import { NodeEditor, ClassicPreset } from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
  ConnectionPlugin,
  Presets as ConnectionPresets
} from "rete-connection-plugin";
import { ReactPlugin, Presets, Drag } from "rete-react-plugin";
import { css } from "styled-components";

export async function createEditor(container) {
  // Define custom sockets
  const outputSocket = new ClassicPreset.Socket("Output Socket");
  const inputSocket = new ClassicPreset.Socket("Input Socket");
  const numberSocket = new ClassicPreset.Socket("Number Socket");

  const editor = new NodeEditor();

  // Can disable drag and drop by setting Drag to false.
  const area = new AreaPlugin(container, {Drag : true});
  const connection = new ConnectionPlugin();
  const render = new ReactPlugin({ createRoot });

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  render.addPreset(Presets.classic.setup());
  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);
  area.use(connection);
  area.use(render);

  AreaExtensions.simpleNodesOrder(area);

  // Adding node A with an output socket
  const a = new ClassicPreset.Node("A");
  a.addControl("a", new ClassicPreset.InputControl("text", { initial: "Node A" }));
  a.addOutput("a", new ClassicPreset.Output(outputSocket)); // Using outputSocket
  await editor.addNode(a);

  // Adding node B with an input socket
  const b = new ClassicPreset.Node("B");
  b.addControl("b", new ClassicPreset.InputControl("text", { initial: "Node B" }));
  b.addInput("b", new ClassicPreset.Input(inputSocket)); // Using inputSocket
  await editor.addNode(b);

  // Adding node C with a number socket
  const c = new ClassicPreset.Node("C");
  c.addControl("c", new ClassicPreset.InputControl("number", { 
    initial: "100",
    readonly: true,
    change: async (c, val) => {
      c.data.c = val;
      c.update();
    }
  }));
  c.addOutput("c", new ClassicPreset.Output(numberSocket)); // Using numberSocket
  
   // Custom styling for Node C
  
  await editor.addNode(c);

  // Create connections using matching sockets
  await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "b"));

  // Position the nodes on the canvas
  await area.translate(a.id, { x: -20, y: -100 });
  await area.translate(b.id, { x: 270, y: 0 });
  await area.translate(c.id, { x: 100, y: 200 });

  // Adjust zoom to fit all nodes
  setTimeout(() => {
    AreaExtensions.zoomAt(area, editor.getNodes());
  }, 10);

  return {
    destroy: () => area.destroy(),
  };
}
