# Netflix Investor Relations Page Clone

This folder contains a complete clone of Netflix's Investor Relations page, implemented as a TypeScript component with embedded HTML and CSS.

## Files

- `investor-relations.ts` - Main TypeScript component with HTML template and CSS styles
- `investor-relations-demo.html` - Demo HTML file showing how to use the component
- `README.md` - This documentation file

## Features

The component includes all sections from the original Netflix Investor Relations page:

### 🏢 Company Profile Section
- Market capitalization display ($1,233.27 Billion USD)
- Company description
- Quick links to key investor documents

### 📅 Investor Events
- Quarterly earnings interviews
- Annual stockholder meetings
- Event dates and details

### 📊 Investor Kit
- Long Term View
- Investor Questions
- Contact Accounting Overview
- Netflix Culture information
- Corporate Governance approach

### 💰 Financial Releases and Updates
- Latest quarterly results
- Annual reports
- Investment announcements
- Financial performance updates

### 📈 Quarterly Earnings
- Visual chart representation
- Performance descriptions
- Interactive "View Results" button

### 🔗 Quick Links
- Annual Reports & Proxies
- SEC Filings
- Stock Information
- IR Contacts

## Usage

### Method 1: TypeScript Module
```typescript
import InvestorRelationsComponent from './investor-relations';

// Initialize the component
const investorPage = new InvestorRelationsComponent();
```

### Method 2: Direct HTML Implementation
```html
<!DOCTYPE html>
<html>
<head>
    <title>Netflix Investor Relations</title>
</head>
<body>
    <div id="investor-relations-root"></div>
    <script src="investor-relations.js"></script>
    <script>
        const investorPage = new InvestorRelationsComponent();
    </script>
</body>
</html>
```

## Component Methods

### Public Methods
- `updateMarketCap(newValue: string)` - Update the market cap display
- `addFinancialRelease(release)` - Add new financial release
- `destroy()` - Clean up the component

### Example Usage
```typescript
const investorPage = new InvestorRelationsComponent();

// Update market cap
investorPage.updateMarketCap('$1,500.00');

// Add new financial release
investorPage.addFinancialRelease({
    title: 'Q1 2025 Financial Results',
    date: 'April 20, 2025',
    type: 'quarterly'
});
```

## Styling

The component includes complete CSS styling that matches Netflix's design:
- Dark theme with red accents (#e50914)
- Responsive design for mobile and desktop
- Hover effects and animations
- Netflix brand colors and typography

## Responsive Design

The component is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (480px - 767px)
- Small mobile (< 480px)

## Browser Support

- Modern browsers with ES6+ support
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Development

To modify or extend the component:

1. Edit the TypeScript class in `investor-relations.ts`
2. Update the `template` property for HTML changes
3. Modify the `styles` property for CSS updates
4. Add new methods for additional functionality

## Integration with Angular

Since this is in an Angular project, you can also create an Angular component wrapper:

```typescript
import { Component, OnInit } from '@angular/core';
import { InvestorRelationsComponent } from './investor-relations';

@Component({
  selector: 'app-investor-relations',
  template: '<div id="investor-relations-root"></div>'
})
export class InvestorRelationsAngularComponent implements OnInit {
  private investorComponent!: InvestorRelationsComponent;
  
  ngOnInit() {
    this.investorComponent = new InvestorRelationsComponent();
  }
  
  ngOnDestroy() {
    this.investorComponent?.destroy();
  }
}
```

## License

This is a clone for educational/demonstration purposes. Netflix and all related trademarks are property of Netflix, Inc.
