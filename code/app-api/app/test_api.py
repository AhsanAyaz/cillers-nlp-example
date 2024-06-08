import unittest
import json
from openai_test import app  # Ensure this import points to your Flask app

class APITestCase(unittest.TestCase):
    def setUp(self):
        # Set up the test client
        self.app = app.test_client()
        self.app.testing = True

    def test_get_response(self):
        prompt = "Translate this sentence 'Compose a poem that explains the concept of recursion in programming.' to Swedish."
        
        # POST request with prompt
        response = self.app.post('/get-response', 
                                 data=json.dumps({'prompt': prompt}),
                                 content_type='application/json')
        
        # Assert that the status code is 200
        self.assertEqual(response.status_code, 200)
        
        # Parse the response data
        response_data = json.loads(response.data)
        
        # Assert that the response contains the key 'response'
        self.assertIn('response', response_data)
        
        # Assert that the response is not empty
        self.assertTrue(len(response_data['response']) > 0)
        
        # Print the response content
        print('Response:', response_data['response'])

        # Additional assertion for specific expected content if needed
        self.assertIn('rekursion', response_data['response'])

    def test_no_prompt(self):
        # Make a POST request without a prompt to the /get-response endpoint
        response = self.app.post('/get-response', 
                                 data=json.dumps({}),
                                 content_type='application/json')
        
        # Assert that the status code is 400
        self.assertEqual(response.status_code, 400)
        
        # Parse the response data
        response_data = json.loads(response.data)
        
        # Assert that the response contains the key 'error'
        self.assertIn('error', response_data)
        
        # Assert that the error message is correct
        self.assertEqual(response_data['error'], 'No prompt provided')
        
        # Print the error content
        print('Error:', response_data['error'])

        # Additional assertion for the type of error if needed
        self.assertEqual(response_data['error'], 'No prompt provided')

if __name__ == '__main__':
    unittest.main()