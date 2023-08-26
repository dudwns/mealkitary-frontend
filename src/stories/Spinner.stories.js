import Spinner from '../components/Spinner';

export default {
  title: 'Component/Spinner',
  component: Spinner,
  args: {
    size: 80,
    loading: true,
  },
  argTypes: {
    size: { control: 'number' },
    color: { control: 'color' },
    loading: { control: 'boolean' },
  },
};

export const Default = (args) => {
  return <Spinner {...args} />;
};
