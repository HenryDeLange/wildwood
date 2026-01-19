import Papa from 'papaparse';
import type { ItemProps } from '../components/domain/components/Item';

export const KEY_GOOGLE_SHEET = 'SHEET';

export const fetchItems = async () => {
    const res = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ6Tp66xYo2Zk0nCJeW9VNEs3q06p6driZO7k-e8sX0KzFYcrisNQ9JHqP-2pJDjj_LG21QhWbq-_iW/pub?gid=0&single=true&output=csv');
    const content = await res.text();
    const parsed = Papa.parse(content, {
        header: true, // Use first row as keys
        skipEmptyLines: true // Ignore blank rows
    });
    return (parsed.data as Record<string, string>[]).map(row => ({
        id: parseInt(row.ID),
        item: row.Item,
        description: row.Description,
        price: parseFloat(row.Price.replace(/[^\d.]/g, '')),
        seller: row.Seller,
        photo: row.Photo || null,
        dateAdded: new Date(row['Date Added']),
        dateSold: row['Date Sold'] ? new Date(row['Date Sold']) : null,
        paymentLink: row['Payment Link'],
    } as ItemProps));
};

