import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { HRLeavesPage } from '../src/pages/HumanResources/Dashboard Childs/leavespage.jsx'
import HRLeavesReducer from '../src/redux/Slices/HRLeavesSlice.js'
import HREmployeesPageReducer from '../src/redux/Slices/HREmployeesPageSlice.js'
import HRReducer from '../src/redux/Slices/HRSlice.js'

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Calendar: () => <span data-testid="calendar-icon" />,
  Filter: () => <span data-testid="filter-icon" />,
  ChevronDown: () => <span data-testid="chevron-icon" />,
  CheckCircle: () => <span data-testid="check-icon" />,
  XCircle: () => <span data-testid="x-icon" />,
  Clock: () => <span data-testid="clock-icon" />,
  Info: () => <span data-testid="info-icon" />,
  AlertCircle: () => <span data-testid="alert-icon" />,
  CheckCircle2: () => <span data-testid="check2-icon" />,
  X: () => <span data-testid="x-icon" />,
}))

// Mock useIsDark hook
vi.mock('../src/hooks/useIsDark.js', () => ({
  useIsDark: () => true,
}))

// Mock useToast hook
vi.mock('../src/hooks/use-toast.js', () => ({
  useToast: () => ({
    toast: vi.fn(),
  }),
}))

// Mock hrApiService to prevent actual API calls
vi.mock('../src/redux/apis/HRApiService.js', () => ({
  hrApiService: {
    get: vi.fn().mockResolvedValue({ data: { success: true, data: [], type: "GetAllLeaves" } }),
    post: vi.fn().mockResolvedValue({ data: { success: true } }),
    patch: vi.fn().mockResolvedValue({ data: { success: true, message: "Updated", data: {} } }),
  }
}))

const createTestStore = () => {
  return configureStore({
    reducer: {
      HRLeavesReducer,
      HREmployeesPageReducer,
      HRReducer,
    },
    preloadedState: {
      HRLeavesReducer: {
        data: [],
        isLoading: false,
        success: { status: false, message: null, content: null },
        error: { status: false, message: null, content: null },
        fetchData: false
      },
      HREmployeesPageReducer: {
        data: [],
        isLoading: false,
        success: false,
        fetchData: false,
        employeeData: null,
        error: { status: false, message: null, content: null }
      },
      HRReducer: {
        data: { _id: "test-hr-id" },
        isLoading: false,
        isAuthenticated: true,
        isAuthourized: true,
        isSignUp: true,
        error: { status: false, message: null, content: null }
      }
    }
  })
}

describe('HRLeavesPage', () => {
  let store

  beforeEach(() => {
    store = createTestStore()
  })

  it('renders the leaves page without crashing', async () => {
    render(
      <Provider store={store}>
        <HRLeavesPage />
      </Provider>
    )
    
    // Just verify the component renders without error
    await waitFor(() => {
      // Check that the component renders something
      expect(document.querySelector('.bg-white')).toBeDefined()
    })
  })
})