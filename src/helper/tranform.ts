function transform(raw) {
    return {
      id: raw.id,
      date: `${raw.date} ${raw.time}`,   // or format properly
      status: raw.status.toUpperCase() === 'UPCOMING' ? 'OPEN' : raw.status.toUpperCase(),
      price: Number(raw.price.replace(/[^\d]/g, '')),
      title: `${raw.from} → ${raw.to}`,
      passengers: 1,
      luggage: 1,
      instructions: raw.notes ?? '',
      details: [
        { label: "From", value: raw.from, checkboxKey: "from" },
        { label: "To", value: raw.to, checkboxKey: "to" },
        { label: "Carrier", value: raw.carrier, checkboxKey: "carrier" },
        { label: "Departure Time", value: raw.time, checkboxKey: "time" }
      ],
      customer: { name: "Customer Name", checkboxKey: "customer" },
      comment: raw.notes ? { text: raw.notes, checkboxKey: "comment" } : undefined,
      singboardFilename: raw.id + ".pdf"
    };
  }
  