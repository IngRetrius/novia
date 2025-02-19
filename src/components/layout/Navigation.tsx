import React from 'react';
import { Heart, Image, Book, Flower } from 'lucide-react';

type NavItem = {
id: string;
title: string;
icon: React.ReactNode;
};

const navItems: NavItem[] = [
{
id: 'reasons',
title: 'Reasons',
icon: <Heart className="w-5 h-5" />,
},
{
id: 'gallery',
title: 'Gallery',
icon: <Image className="w-5 h-5" />,
},
{
id: 'promises',
title: 'Promises',
icon: <Book className="w-5 h-5" />,
},
{
id: 'garden',
title: 'Garden',
icon: <Flower className="w-5 h-5" />,
},
];

interface NavigationProps {
activeSection: string;
onSectionChange: (section: string) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
return (
<nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50">
<div className="max-w-4xl mx-auto px-4">
<div className="flex items-center justify-center space-x-1 py-3">
{navItems.map((item) => (
<button
key={item.id}
onClick={() => onSectionChange(item.id)}
className={`
flex items-center space-x-2 px-4 py-2 rounded-lg transition-all
${
activeSection === item.id
? 'bg-purple-600 text-white shadow-md'
: 'hover:bg-purple-100 text-purple-600 hover:text-purple-800'
}
`}
>
{item.icon}
<span className="text-sm font-medium">{item.title}</span>
</button>
))}
</div>
</div>
</nav>
);
}