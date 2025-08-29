import React, { useState } from 'react';
import api from '../../api/apiClient';


export default function SearchForm({ onResults }) {
const [form, setForm] = useState({ from: 'DEL', to: 'BOM', date: '', pax: 1 });
const [loading, setLoading] = useState(false);


const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));


const submit = async (e) => {
e.preventDefault();
setLoading(true);
try {
// call real backend
const res = await api.get('/flights/search', { params: { source: form.from, destination: form.to, date: form.date } });
onResults(res.data || []);
} catch (err) {
// fallback mock
onResults([]);
} finally {
setLoading(false);
}
};


return (
<form className="search-form" onSubmit={submit}>
<div className="field">
<label>From</label>
<input name="from" value={form.from} onChange={change}  placeholder='Enter City From'/>
</div>
<div className="field">
<label>To</label>
<input name="to" value={form.to} onChange={change} placeholder='Enter City To' />
</div>
<div className="field">
<label>Date</label>
<input type="date" name="date" value={form.date} onChange={change} />
</div>
<div className="field">
<label>Passengers</label>
<input type="number" min={1} name="pax" value={form.pax} onChange={change} />
</div>
<div className="actions">
<button className="btn solid" type="submit" disabled={loading}> {loading ? 'Searching...' : 'Search'} </button>
</div>
</form>
);
}

