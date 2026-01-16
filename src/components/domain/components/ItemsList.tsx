import Papa from 'papaparse';
import { useEffect, useState } from 'react';
import { VBox } from '../../ui/layout';
import { Item, type ItemProps } from './Item';
import { LoadingIndicator } from './LoadingIndicator';

// TODO: Virtualize the list of items (tanstack lib?)
// TODO: Cache the fetch results (maybe use one of the small fetch libs?)

export function ItemsList() {
    const [items, setItems] = useState<ItemProps[] | null>(null);

    useEffect(() => {
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6Tp66xYo2Zk0nCJeW9VNEs3q06p6driZO7k-e8sX0KzFYcrisNQ9JHqP-2pJDjj_LG21QhWbq-_iW/pub?gid=0&single=true&output=csv')
            .then(res => res.text())
            .then(content => {
                const parsed = Papa.parse(content, {
                    header: true, // Use first row as keys
                    skipEmptyLines: true // Ignore blank rows
                });
                const mapped: ItemProps[] = (parsed.data as any[]).map(row => ({
                    id: row['ID'],
                    item: row['Item'],
                    description: row['Description'],
                    price: parseFloat(row['Price'].replace(/[^\d.]/g, '')), // strip 'R'
                    seller: row['Seller'],
                    photo: row['Photo'] || null,
                    dateAdded: new Date(row['Date Added']),
                    dateSold: row['Date Sold'] ? new Date(row['Date Sold']) : null,
                    paymentLink: row['Payment Link'],
                }));
                setItems(mapped);
            });
    }, []);

    return (
        <div style={{ padding: '1rem' }}>
            {!items
                ? // loading
                <LoadingIndicator />
                : // loaded
                <VBox>
                    {items.map((item, i) => <Item key={i} {...item} />)}
                </VBox>
            }
        </div>
    );
}
