package backend.com.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.com.entity.SubService;
import backend.com.repository.SubServiceRepository;

@Service
public class SubServiceService {

	@Autowired
	SubServiceRepository subserviceRepository;

	public String addSubService(SubService subService) {

		Optional<SubService> result = subserviceRepository.findById(subService.getServiceId());

		if (result.isPresent()) {
			return "Serivce Id Must Be Unique";
		} else {
			subserviceRepository.save(subService);
			return "Service Stored Successfully";
		}
	}

	public List<SubService> findAllSubServices() {
		return subserviceRepository.findAll();
	}

	public SubService findSubServiceById(int serviceId) {

		Optional<SubService> result = subserviceRepository.findById(serviceId);

		if (result.isPresent()) {
			return result.get();
		} else {
			return null;
		}
	}

	public String updateSubService(SubService subService) {

		Optional<SubService> result = subserviceRepository.findById(subService.getServiceId());

		if (result.isPresent()) {
			SubService ss = result.get();
			ss.setServiceName(subService.getServiceName());
			ss.setServiceDescription(subService.getServiceDescription());
			ss.setImage(subService.getImage());
			ss.setCategory(subService.getCategory());
			subserviceRepository.saveAndFlush(ss);
			return "SubService Updated Successfully";
		} else {
			return "SubService Record Not Present";
		}
	}

	public String deleteSubService(int serviceId) {

		Optional<SubService> result = subserviceRepository.findById(serviceId);

		if (result.isPresent()) {
			subserviceRepository.deleteById(serviceId);
			return "Service Deleted Successfully";
		} else {
			return "Service Record Not Present";
		}
	}
}