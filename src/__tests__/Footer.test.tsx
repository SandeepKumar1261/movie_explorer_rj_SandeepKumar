import { render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from '../Components/Common/Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  test('renders the Movie website name', () => {
    expect(screen.getByText('MovieExplorer')).toBeInTheDocument();
  });
});
