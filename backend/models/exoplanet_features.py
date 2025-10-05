from pydantic import BaseModel, Field


class ExoplanetFeatures(BaseModel):
    """
    Pydantic model for validating the input features of an exoplanet candidate,
    ordered according to the user's specific 12-field feature list.
    """
    # Logarithm of stellar insolation received by the planet (log of 'planet_insol')
    log_planet_insol: float = Field(..., description="Logarithm (base 10) of the stellar insolation [log(W/m^2)].")

    # Radius of the planet candidate relative to Earth's radius
    planet_radius: float = Field(..., description="Planet candidate radius [Earth Radii].")

    # Measure of the detection strength
    signal_to_noise: float = Field(..., description="Signal-to-Noise Ratio (SNR) of the transit signal.")

    # Ratio of the planet radius to the star radius
    planet_to_star_ratio: float = Field(..., description="Ratio of the planet's radius to its host star's radius.")

    # Planet's equilibrium temperature
    planet_teq: float = Field(..., description="Planet's equilibrium temperature [K].")

    # Stellar insolation received by the planet
    planet_insol: float = Field(..., description="Stellar insolation received by the planet [W/m^2].")

    # Duration of the transit event
    transit_duration: float = Field(...,
                                    description="Duration of the transit event [hours or days, depending on scaling].")

    # Time it takes for the planet to complete one orbit
    orbital_period: float = Field(..., description="Orbital period of the planet candidate [days].")

    # Impact parameter of the transit (how central the transit path is)
    impact_parameter: float = Field(..., description="Impact parameter (b) of the transit.")

    # Proxy for the planet's orbital velocity
    orbital_velocity_proxy: float = Field(..., description="A proxy measure for the orbital velocity [m/s or similar].")

    # Logarithm of the orbital period (log of 'orbital_period')
    log_orbital_period: float = Field(..., description="Logarithm (base 10) of the orbital period [log(days)].")

    # Ratio of the planet's temperature to the star's temperature (or similar ratio)
    temp_ratio: float = Field(...,
                              description="Ratio of planet temperature to star temperature (T_eff ratio or similar).")
