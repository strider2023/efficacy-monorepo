import { createFileRoute } from '@tanstack/react-router';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

export const Route = createFileRoute('/edit/workflow')({
    component: Flow
})

const nodes = [
    {
        id: '1',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
        type: 'input',
    },
    {
        id: '2',
        data: { label: 'World' },
        position: { x: 100, y: 100 },
    },
];

function Flow() {
    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow nodes={nodes}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}