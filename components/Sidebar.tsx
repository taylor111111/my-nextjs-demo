// components/Sidebar.tsx
export default function Sidebar({ menu }: { menu: string[] }) {
    return (
        <aside style={{ width: 200, background: '#eee', padding: 16 }}>
            <h3>Menu</h3>
            <ul>
                {menu.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </aside>
    );
}
