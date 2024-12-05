import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './src/App/App';


test('verify notification item deletion', async () => {
  const appRef = React.createRef();
  render(<App ref={appRef} />);

  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3);

  expect(listItems[0].textContent).toEqual('New course available');
  expect(listItems[0]).toBeInTheDocument();

  expect(listItems[1].textContent).toEqual('New resume available');
  expect(listItems[1]).toBeInTheDocument();

  expect(listItems[2].textContent).toEqual('Urgent requirement - complete by EOD');
  expect(listItems[2]).toBeInTheDocument();

  if (appRef.current) {
    await userEvent.click(screen.getByText('New course available'))
  }

  await waitFor(() => {
    expect(appRef.current.state).toEqual(
      expect.objectContaining({
        "notifications": [
          {"id": 2, "type": "urgent", "value": "New resume available"}, 
          {"html": {"__html": "<strong>Urgent requirement</strong> - complete by EOD"}, "id": 3, "type": "urgent"}
        ]
      }
    ))
  })
});