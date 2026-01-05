import DrawInterface from "../components/DrawInterface";
import { Metadata } from 'next';
import './draw.css'

export const metadata: Metadata = {
    title: 'Draw | Almost Studio',
    description: 'Interactive project archive',
};

export default function Page() {
    return <DrawInterface />;
}