import matplotlib.pyplot as plt
import os

# Requirements and progress
requirements_progress = {
    "User Registration": 100,
    "User Login": 100,
    "Role based Access": 100,
    "JWT Token": 100,
    "Lamp Control": 100,
    "Fan Control": 75,
    "Temperature Sensor": 25,
    "Device Registration": 50,
    "Buzzer": 25,
    "Coffee Machine": 25,
    "Media Player": 25,
    "Device Dashboard": 50,
    "Error Handling": 75,
    "Backend Communication": 50,
    "Notification Feature": 0,
    "Schedule Device Actions": 100,
}


# Color based on percentage
def get_color(percent):
    if percent == 100:
        return '#4CAF50'  # Green
    elif percent == 75:
        return '#2196F3'  # Blue
    elif percent == 50:
        return '#FFEB3B'  # Yellow
    elif percent == 25:
        return '#FF9800'  # Orange
    elif percent == 0:
        return '#F44336'  # Red
    else:
        return '#9E9E9E'  # Gray for undefined


# Create output directory
output_dir = "progress_charts"
os.makedirs(output_dir, exist_ok=True)

# Generate circular charts
for req, percent in requirements_progress.items():
    fig, ax = plt.subplots(figsize=(2.5, 2.5), subplot_kw={'aspect': 'equal'})

    # Create donut chart
    ax.pie([percent, 100 - percent],
           startangle=90,
           colors=[get_color(percent), '#2D2D2D'],
           wedgeprops=dict(width=0.3))

    # Add center percentage
    ax.text(0, 0, f"{percent}%", ha='center', va='center', fontsize=14, color='white')
    ax.set_title(req, fontsize=9, color='white', pad=15)

    # Style background
    fig.patch.set_facecolor('#1E1E1E')
    ax.set_facecolor('#1E1E1E')
    plt.axis('off')

    # Save the figure
    safe_name = req.replace(" ", "_").replace("/", "-")
    plt.savefig(f"{output_dir}/{safe_name}.png", bbox_inches='tight', facecolor=fig.get_facecolor())
    plt.close()

print(f"Charts saved to: {os.path.abspath(output_dir)}")
